export const DEFAULT_MEMBERS = [
  { id: "m_ashu", name: "Himanshu Bhai" },
  { id: "m_jay", name: "Jay Bhai" },
  { id: "m_bhaiya", name: "Sudhir Bhai" },
  { id: "m_aunty", name: "Govind Bhai" },
];

export const STORAGE_KEY_PREVIOUS_READINGS = "hbc_previous_readings";
export const STORAGE_KEY_MEMBERS = "hbc_members";
export const STORAGE_KEY_SELECTED_HOUSE = "hbc_selected_house_id";
export const STORAGE_KEY_SAVE_PASSWORD = "hbc_save_password";

export const generateMemberId = () =>
  `m_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
