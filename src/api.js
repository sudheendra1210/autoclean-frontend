const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://autoclean-backend-i5b9.onrender.com";
// ============================================================
// UPLOAD: Upload file and get preview
// ============================================================
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to upload file");
  }

  return await response.json();
}

// ============================================================
// GENERATE PLAN: Get a safe cleaning plan from local Ollama
// ============================================================
export async function generateCode(sessionId, instruction) {
  const response = await fetch(`${API_BASE}/generate-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      instruction: instruction,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to generate cleaning plan");
  }

  return await response.json();
}

// ============================================================
// APPLY PLAN: Execute allow-listed operations on the uploaded dataset
// ============================================================
export async function executeCode(sessionId, code, outputFormat = "json") {
  const formData = new FormData();
  formData.append("session_id", sessionId);
  formData.append("code", code);
  formData.append("output_format", outputFormat);

  const response = await fetch(`${API_BASE}/execute`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to apply cleaning plan");
  }

  if (outputFormat === "csv") {
    const csvText = await response.text();
    return {
      format: "csv",
      data: csvText,
    };
  }

  return await response.json();
}

// ============================================================
// QUICK CLEAN: Original deterministic cleaning (no AI)
// ============================================================
export async function cleanFile(file, outputFormat = "json") {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/clean?output_format=${outputFormat}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to clean file");
  }

  // Handle CSV response
  if (outputFormat === "csv") {
    const csvText = await response.text();
    return {
      format: "csv",
      data: csvText,
      count: parseInt(response.headers.get("X-Count") || "0"),
      total_rows: parseInt(response.headers.get("X-Total-Rows") || "0"),
      processed: parseInt(response.headers.get("X-Processed") || "0"),
    };
  }

  // Handle JSON response
  const jsonData = await response.json();
  return {
    format: "json",
    ...jsonData,
  };
}

// ============================================================
// CLEAR SESSION: Clean up server-side data
// ============================================================
export async function clearSession(sessionId) {
  const response = await fetch(`${API_BASE}/session/${sessionId}`, {
    method: "DELETE",
  });
  return response.ok;
}
