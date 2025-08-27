declare type CallLog = {
  id: number;
  dateTime: string;
  from: string;
  to: string;
  endedReason: string;
  callDuration: string;
  type: string;
};

declare type GlobalState = {
  token: string;
  vapiId: string;
  twilioNumber: string;
  business: {
    id: string;
    name: string;
    country: string;
    industry: string;
  };
  forgotEmail: string;
  newPassword: string;
  end_date: Date;
  start_date: Date;
};

declare type PostLogin = {
  role: string;
  email: string;
  password: string;
  secondary_email: string;
  secondary_password: string;
};

declare type PostLoginResponse = {
  data: {
    access_token: string;
  };
};

declare type VerifyOTPResponse = {
  data: {
    access_token: string;
    message: string;
  };
};

declare type CallVolume = {
  date: string;
  totalCalls: number;
  successCalls: number;
  failedCalls: number;
};

declare type Usage = {
  date: string;
  total_minutes: number;
  call_count: number;
  average_minutes_per_call: number;
};

declare type DashboardStats = {
  total_businesses: number;
  active_businesses: number;
  calls_minutes: number;
};

declare type BusinessStats = {
  totalCalls: number;
  successCalls: number;
  calls_minutes: number;
};

declare type Product = {
  product_id: string;
  business_id: string;
  product_name: string;
  product_type: string;
  technical_specification: string;
  product_description: string;
  quantity: number;
  price: string;
};

declare type PostProduct = {
  product_name: string;
  product_type: string;
  technical_specification: string;
  product_description: string;
  quantity: string;
  price: string;
};

declare type ProductDetails = {
  product_id: string;
  business_id: string;
  product_name: string;
  product_type: string;
  technical_specification: string;
  product_description: string;
  quantity: number;
  price: string;
};

declare type PhoneCallData = {
  startedAt: string;
  endedAt: string;
  customerNumber: string;
  endedReason: string;
  duration: string;
  transcript: {
    messages: Array<{
      role: string;
      message: string;
      time: number;
      endTime?: number;
      duration?: number;
      source?: string;
      secondsFromStart?: number;
    }>;
    messagesOpenAIFormatted: Array<{
      role: string;
      content: string;
    }>;
    transcript: string;
    recordingUrl: string;
    stereoRecordingUrl: string;
    recording: {
      stereoUrl: string;
      mono: {
        combinedUrl: string;
        assistantUrl: string;
        customerUrl: string;
      };
    };
  } | null;
  recordingUrl: string | null;
  stereoRecordingUrl: string | null;
  type: string;
  assistant_id: string;
  business_id: string;
  vapi_call_id: string;
};

declare type SingleCallData = {
  id: string;
  assistantId: string;
  phoneNumberId: string;
  type: string;
  startedAt: string;
  endedAt: string;
  transcript: string;
  recordingUrl: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  orgId: string;
  cost: number;
  assistant: {
    model: {
      model: string;
      messages: {
        role: string;
        content: string;
      }[];
      provider: string;
    };
    voice: string;
    firstMessage: string;
  };
  customer: {
    number: string;
  };
  status: string;
  endedReason: string;
  messages: {
    role: string;
    time: number;
    message?: string;
    source?: string;
    endTime: number;
    duration: number;
    secondsFromStart: number;
  }[];
  stereoRecordingUrl: string;
  costBreakdown: {
    stt: number;
    llm: number;
    tts: number;
    vapi: number;
    total: number;
    llmPromptTokens: number;
    llmCompletionTokens: number;
    ttsCharacters: number;
    analysisCostBreakdown: {
      summary: number;
      structuredData: number;
      successEvaluation: number;
      summaryPromptTokens: number;
      summaryCompletionTokens: number;
      structuredDataPromptTokens: number;
      successEvaluationPromptTokens: number;
      structuredDataCompletionTokens: number;
      successEvaluationCompletionTokens: number;
    };
  };
  phoneCallProvider: string;
  phoneCallProviderId: string;
  phoneCallTransport: string;
  analysis: {
    summary: string;
    successEvaluation: string;
  };
  artifact: {
    recordingUrl: string;
    stereoRecordingUrl: string;
    messages: {
      role: string;
      time: number;
      message?: string;
      source?: string;
      endTime: number;
      duration: number;
      secondsFromStart: number;
    }[];
    messagesOpenAIFormatted: {
      content: string;
      role: string;
    }[];
    transcript: string;
  };
  costs: {
    cost: number;
    type: string;
    minutes?: number;
    transcriber?: {
      model: string;
      provider: string;
    };
    model?: {
      model: string;
      provider: string;
    };
    promptTokens?: number;
    completionTokens?: number;
    voice?: {
      voiceId: string;
      provider: string;
    };
    characters?: number;
    subType?: string;
    analysisType?: string;
  }[];
  monitor: {
    listenUrl: string;
    controlUrl: string;
  };
  transport: Record<string, unknown>;
};

declare type ProductTypes = {
  id: number;
  type: string;
};

declare type Business = {
  id: string;
  name: string;
  industry: string;
  contact_number: string;
  twilio: string | null;
  website: string;
  country: string;
  assistant_id: string;
  created_at: string;
  updated_at: string;
  dev_agent_status: string;
};

declare type PromptTemplate = {
  id: number;
  name: string;
  template: string;
};

declare type UpdateBusinessAgent = {
  last_message: string;
  system_prompt: string;
  first_message: string;
  business_name: string;
};

declare type KnowledgeBase = {
  file_id: string;
  file_name: string;
  file_type: string;
  created_at: string;
};

declare type DocumentUpload = {
  document_name: string;
  document_type: string;
  document_content: string;
};

declare type BusinessAgentConfig = {
  vapi_id: string;
  business_id: string;
  communication_type: string;
  voice_agent_provider: string;
  voice_agent: string;
  transcriber_provider: string;
  transcriber_language: string;
  ai_model_name: string;
  system_prompt: string;
  first_message: string;
  edit_privilege: boolean;
  twilio_number: string;
  industry: string;
  country: string;
  contact_number: string;
  last_message: string;
  business_name: string;
};

declare type BusinessHoursBody = {
  business_status: boolean;
  data: {
    day: string;
    status: string;
    open: string;
    close: string;
  }[];
  timezone: string;
};

declare type BusinessHours = {
  status: string;
  business_status: boolean;
  data: {
    day: string;
    status: string;
    open: string;
    close: string;
  }[];
};

declare type Ticket = {
  ticket_id: string;
  business_name: string;
  industry: string;
  country: string;
  status: string;
  problem: string;
  created_at: string;
};

declare type GetTicket = {
  ticket_status: string;
  business_industry: string;
  business_name: string;
  problem: string;
  comments: {
    type: string;
    message: string;
    created_at: string;
  }[];
  created_at: string;
};

declare type HealthCheck = {
  "API Version": string;
  "Postgres Service": string;
  "Vapi Service": string;
};

declare type PackageStats = {
  business_id: string;
  plan: string;
  plan_limit_minutes: number;
  total_minutes_used: number;
  exceed_minutes: number;
};

declare type BusinessDetails = {
  business_id: string;
  business_name: string;
  contact_number: string;
  website: string | null;
  country: string;
  language: string;
  industry_type: string;
  communication_type: string;
  number_type: string;
  voice_provider: string;
  voice: string;
  ai_model_provider: string;
  ai_model: string;
  transcriber_provider: string;
  transcriber_language: string;
  system_prompt: string;
  first_message: string;
  last_message: string;
  twilio: string;
  first_name: string;
  last_name: string;
  email: string;
};

declare type UpdateBusinessBody = {
  business_name: string;
  industry: string;
  contact_number: string;
  country: string;
  language: string;
  communication_type: string;
  ai_model_name: string;
  system_message: string;
  voice_agent_provider: string;
  voice_agent: string;
  transcriber_language: string;
  edit_privilege: boolean;
  first_message: string;
  last_message: string;
};