export interface AskMonModel {
  id: string;
  label: string;
  note: string;
  free: boolean;
}

export const ASK_MON_MODELS: AskMonModel[] = [
  {
    id: "baidu/ernie-5.5-flash-preview:free",
    label: "ERNIE 5.5 Flash",
    note: "Baidu, miễn phí, gọi công cụ ổn định",
    free: true
  },
  {
    id: "inclusionai/ling-3.2-flash:free",
    label: "Ling 3.2 Flash",
    note: "inclusionAI, miễn phí, phản hồi chậm hơn",
    free: true
  },
  {
    id: "nvidia/nemotron-3.5-super-vl:free",
    label: "Nemotron 3.5 Super VL",
    note: "NVIDIA, miễn phí, nhiều ngữ",
    free: true
  },
  {
    id: "nvidia/nemotron-3.5-lightning:free",
    label: "Nemotron 3.5 Lightning",
    note: "NVIDIA, miễn phí, nhanh nhất",
    free: true
  },
  {
    id: "google/gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    note: "Google, có phí, ổn định nhất",
    free: false
  }
];

export const ASK_MON_MODEL_IDS = new Set(ASK_MON_MODELS.map((model) => model.id));

export function isAllowedModel(id: string | undefined | null): id is string {
  return typeof id === "string" && ASK_MON_MODEL_IDS.has(id);
}

export function resolveModel(requested?: string | null): string {
  if (isAllowedModel(requested)) return requested;
  const configured = process.env.OPENROUTER_MODEL;
  if (isAllowedModel(configured)) return configured;
  return ASK_MON_MODELS[0].id;
}
