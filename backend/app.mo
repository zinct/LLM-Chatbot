import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Array "mo:base/Array";
import List "mo:base/List";
import Nat32 "mo:base/Nat32";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import LLM "mo:llm";

import Cycles "mo:base/ExperimentalCycles";
import IC "ic:aaaaa-aa";

actor JobPilot {
  type User = {
    fullName : ?Text;
    dateOfBirth : ?Nat;
    yearsOfExperience : ?Text;
    educationLevel : ?Text;
    personalityTraits : ?[Text];
    learningStyle : ?Text;
    jobRoles : ?[Text];
    jobSearchStatus : ?Text;
    jobLevel : ?Text;
    workMode : ?Text;
    companySize : ?Text;
    industriesOfInterest : ?[Text];
    expectedLocation : ?Text;
    isRegistered : ?Nat8;
  };

  // Resume
  type PersonalInfo = {
    name : ?Text;
    title : ?Text;
    email : ?Text;
    phone : ?Text;
    location : ?Text;
    website : ?Text;
    summary : ?Text;
  };

  type Experience = {
    id : ?Text;
    company : ?Text;
    position : ?Text;
    location : ?Text;
    startDate : ?Text;
    endDate : ?Text;
    current : ?Bool;
    description : ?Text;
    achievements : ?[Text];
  };

  type Education = {
    id : ?Text;
    institution : ?Text;
    degree : ?Text;
    location : ?Text;
    startDate : ?Text;
    endDate : ?Text;
    description : ?Text;
  };

  type Language = {
    id : ?Text;
    language : ?Text;
    proficiency : ?Text;
  };

  type Project = {
    id : ?Text;
    title : ?Text;
    description : ?Text;
    technologies : ?[Text];
    link : ?Text;
  };

  type Certification = {
    id : ?Text;
    name : ?Text;
    issuer : ?Text;
    date : ?Text;
    link : ?Text;
  };

  type ResumeId = Nat32;
  type Resume = {
    id : ResumeId;
    personalInfo : ?PersonalInfo;
    experience : ?[Experience];
    education : ?[Education];
    skills : ?[Text];
    languages : ?[Language];
    projects : ?[Project];
    certifications : ?[Certification];
    updatedAt: Int;
  };

  type Response<T> = Result.Result<T, Text>;

  stable var usersStorage : [(Principal, User)] = [];

  private stable var nextResumeId : ResumeId = 0;
  stable var resumesStorage : [(Principal, [Resume])] = [];

  var userStore = Map.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
  var resumesStore = Map.HashMap<Principal, [Resume]>(0, Principal.equal, Principal.hash);

  // RESUME
  public shared (msg) func resumes() : async Response<[Resume]> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    switch (resumesStore.get(msg.caller)) {
      case (?existingResumes) { return #ok(existingResumes) };
      case null { return #err("No resumes found.") };
    };
  };
  
  type ResumeParams = {
    resumeId : ResumeId;
  };
  public shared (msg) func resume(params: ResumeParams) : async Response<Resume> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    switch (resumesStore.get(msg.caller)) {
      case (?existingResumes) {
        let foundResume = Array.find<Resume>(existingResumes, func(r) { r.id == params.resumeId });

        switch (foundResume) {
          case (?resume) { return #ok(resume); };
          case null { return #err("Resume ID not found."); };
        };
      };
      case null { return #err("No resumes found."); };
    };
  };

  public shared (msg) func createResume() : async Response<ResumeId> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let newResume : Resume = {
      id = nextResumeId;
      personalInfo = null;
      experience = null;
      education = null;
      skills = null;
      languages = null;
      projects = null;
      certifications = null;
      updatedAt = Time.now();
    };

    nextResumeId += 1;

    let index : ResumeId = switch (resumesStore.get(msg.caller)) {
      case (?existingResumes) {
        let updatedResumes = List.toArray(List.push(newResume, List.fromArray(existingResumes)));
        resumesStore.put(msg.caller, updatedResumes);
        newResume.id;
      };
      case null {
        resumesStore.put(msg.caller, [newResume]);
        newResume.id;
      };
    };

    return #ok(index);
  };

  type UpdateResumeParams = {
    resumeId : ResumeId;
    personalInfo : ?PersonalInfo;
    experience : ?[Experience];
    education : ?[Education];
    skills : ?[Text];
    languages : ?[Language];
    projects : ?[Project];
    certifications : ?[Certification];
  };
  public shared (msg) func updateResume(params : UpdateResumeParams) : async Response<Text> {
    switch (resumesStore.get(msg.caller)) {
      case (?existingResumes) {
        let foundResume = Array.find<Resume>(existingResumes, func(r) { r.id == params.resumeId });

        switch (foundResume) {
          case (?resume) {
            let updatedResume: Resume = {
              id = resume.id;
              personalInfo = if (params.personalInfo != null) params.personalInfo else resume.personalInfo;
              experience = if (params.experience != null) params.experience else resume.experience;
              education = if (params.education != null) params.education else resume.education;
              skills = if (params.skills != null) params.skills else resume.skills;
              languages = if (params.languages != null) params.languages else resume.languages;
              projects = if (params.projects != null) params.projects else resume.projects;
              certifications = if (params.certifications != null) params.certifications else resume.certifications;
              updatedAt = Time.now();
            };

            let updatedResumes = Array.map<Resume, Resume>(existingResumes, func(r) {
              if (r.id == params.resumeId) { updatedResume } else { r };
            });

            resumesStore.put(msg.caller, updatedResumes);
            return #ok("Resume updated successfully.");
          };
          case null { return #err("Resume ID not found."); };
        };
      };
      case null { return #err("No resumes found."); };
    };
  };

  public func analyzeResumeJSON(prompt : Text) : async Response<Text> {
    let defaultPrompt : Text = "You are an AI Career Assistant. Your task is to analyze a given resume JSON and provide feedback on missing or improvable elements only on description / summary / tagline / position title data. Your response will be consumed by my system and delivered to users.\nEnsure the output is a JSON array (maximum of 3 items) with the following structure. Keep the response concise and under 1000 characters, and make descriptions short and direct:\n[\n  {\n    \"title\": \"Issue Title\",\n    \"description\": \"Explanation of the issue and why it matters.\"\n  }\n]\n.";
    let response = await LLM.prompt(#Llama3_1_8B, defaultPrompt # " " # prompt);
    return #ok(response);
  };

  type analyzeResumeParams = {
    resume : Text;
    responseType : Text;
  };
  public func analyzeResume(params : analyzeResumeParams) : async Response<Text> {
    let defaultPrompt : Text = "You are an expert Resume AI Career Assistant, Your task is to analyze a given resume. Keep the response concise and under 1000 characters. Your response will be consumed by my system and delivered to users.\nEnsure the output is a JSON array with the following structure: [\"point 1\", \"point 2\"].\nEvaluate the following resume.:";
    let response = await LLM.prompt(#Llama3_1_8B, defaultPrompt # " " # params.resume # " " # "Provide the following outputs: - " # params.responseType);
    return #ok(response);
  };

  public func resumeScore(prompt : Text) : async Response<Text> {
    let defaultPrompt : Text = "You are an AI Career Assistant. Your task is to analyze a given resume JSON and provide a score from 0 to 100. Your response will be consumed by my system and delivered to users.\nONLY return a single integer value representing the score. for example 0 / 85";
    
    let response = await LLM.prompt(#Llama3_1_8B, defaultPrompt # " " # prompt);
    return #ok(response);
  };

  public func enhanceResumeDescription(description : Text) : async Response<Text> {
    let defaultPrompt : Text = "You are an AI Career Assistant. Your task is to improve the grammar, clarity, and professionalism of the given resume descriptions while maintaining their original meaning. Ensure the output is well-structured, concise, and professionally written. Keep the response concise and under 1000 characters";
    
    let response = await LLM.prompt(#Llama3_1_8B, defaultPrompt # " " # description);
    return #ok(response);
  };

  public shared (msg) func profile() : async Response<User> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("Anonymous users are not allowed. Please log in.");
    };

    switch (userStore.get(msg.caller)) {
      case (?user) { return #ok(user); };
      case null { return #err("User profile not found."); };
    };
  };

  // USER
  public shared (msg) func login() : async Response<User> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    switch (userStore.get(msg.caller)) {
      case (?user) { return #ok(user) };
      case null {
        let new_user : User = {
          fullName = null;
          dateOfBirth = null;
          yearsOfExperience = null;
          educationLevel = null;
          personalityTraits = null;
          learningStyle = null;
          jobRoles = null;
          jobSearchStatus = null;
          jobLevel = null;
          workMode = null;
          companySize = null;
          industriesOfInterest = null;
          expectedLocation = null;
          isRegistered = ?0;
        };
        userStore.put(msg.caller, new_user);
        return #ok(new_user);
      };
    };
  };

  type RegisterParams = {
    fullName : ?Text;
    dateOfBirth : ?Nat;
    yearsOfExperience : ?Text;
    educationLevel : ?Text;
    personalityTraits : ?[Text];
    learningStyle : ?Text;
    jobRoles : ?[Text];
    jobSearchStatus : ?Text;
    jobLevel : ?Text;
    workMode : ?Text;
    companySize : ?Text;
    industriesOfInterest : ?[Text];
    expectedLocation : ?Text;
    isRegistered : ?Nat8;
  };
  public shared (msg) func register(
    params : RegisterParams
  ) : async Response<Text> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let updated_profile : User = {
      fullName = params.fullName;
      dateOfBirth = params.dateOfBirth;
      yearsOfExperience = params.yearsOfExperience;
      educationLevel = params.educationLevel;
      personalityTraits = params.personalityTraits;
      learningStyle = params.learningStyle;
      jobRoles = params.jobRoles;
      jobSearchStatus = params.jobSearchStatus;
      jobLevel = params.jobLevel;
      workMode = params.workMode;
      companySize = params.companySize;
      industriesOfInterest = params.industriesOfInterest;
      expectedLocation = params.expectedLocation;
      isRegistered = params.isRegistered;
    };
    
    userStore.put(msg.caller, updated_profile);
    return #ok("User registered successfully.");
  };

  public shared func getAllResumes() : async [Resume] {
    let allEntries = Iter.toArray(resumesStore.entries()); // Ubah iterator ke array
    let allResumes = Array.foldLeft<(Principal, [Resume]), [Resume]>(
        allEntries,
        [],
        func(acc, (_, resumes)) {
            Array.append(acc, resumes);
        }
    );
    return allResumes;
  };

  public shared query (msg) func getUser() : async Response<User> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    switch (userStore.get(msg.caller)) {
      case (?user) { return #ok(user) };
      case null { return #err("User not found.") };
    };
  };

  public shared (msg) func deleteUser() : async Response<Text> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    if (userStore.remove(msg.caller) != null) {
      return #ok("User deleted successfully.");
    } else {
      return #err("User not found.");
    };
  };

  // Orthogonal persistence
  system func preupgrade() {
    usersStorage := Iter.toArray(userStore.entries());
    resumesStorage := Iter.toArray(resumesStore.entries());
  };

  system func postupgrade() {
    userStore := Map.HashMap<Principal, User>(usersStorage.size(), Principal.equal, Principal.hash);
    for ((key, value) in usersStorage.vals()) {
      userStore.put(key, value);
    };

    resumesStore := Map.HashMap<Principal, [Resume]>(resumesStorage.size(), Principal.equal, Principal.hash);
    for ((key, value) in resumesStorage.vals()) {
      resumesStore.put(key, value);
    };
  };

  // Helper
  public shared query (msg) func whoami() : async Principal {
    return msg.caller;
  };

  public func sayhello() : async Text {
    return "Hello World";
  };

  type jobsRecommendationParams = {
    search : Text;
  };
  public shared (msg) func jobsRecommendation(params : jobsRecommendationParams) : async Response<Text> {
      switch (userStore.get(msg.caller)) {
          case (null) {
              return #err("User not registered");
          };
          case (?user) {
              let location = Option.get(user.expectedLocation, "");
              let jobLevel = Option.get(user.jobLevel, "");
              let workMode = Option.get(user.workMode, "");
              let educationLevel = Option.get(user.educationLevel, "");
              let yearsOfExperience = Option.get(user.yearsOfExperience, "");

              let url = "https://jobpilot.jabarkoperasi.com/jobs-recommendation?job_roles=" # params.search # 
                        "&location=" # location # 
                        "&job_level=" # jobLevel # 
                        "&work_mode=" # workMode # 
                        "&education_level=" # educationLevel # 
                        "&years_of_experience=" # yearsOfExperience;

              let http_request : IC.http_request_args = {
                  url = url;
                  method = #get;
                  max_response_bytes = null;
                  headers = [
                      { name = "User-Agent"; value = "jobpilot" },
                      { name = "Content-Type"; value = "application/json" },
                  ];
                  body = null;
                  transform = null;
              };

              Cycles.add<system>(230_949_972_000);

              let http_response : IC.http_request_result = await IC.http_request(http_request);

              let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
                  case (null) { "No value returned" };
                  case (?y) { y };
              };

              return #ok(decoded_text);
          };
      };
  };

  // AI
  public func prompt(prompt : Text) : async Response<Text> {
    let command = "You are an AI career assistant. Only respond to questions about career, CV making, job recommendations, or related courses. If the question is unrelated, say: 'Sorry, I can only assist with career-related topics.' Keep the response concise and under 1000 characters.";
    let response = await LLM.prompt(#Llama3_1_8B, command # " " # prompt);
    return #ok(response);
  };
};
