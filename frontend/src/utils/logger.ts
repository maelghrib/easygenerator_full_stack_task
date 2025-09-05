function maskEmail(email: string) {
    if (!email.includes("@")) return email;
    const [name, domain] = email.split("@");
    return name[0] + "****@" + domain;
}

function sanitizePayload(payload?: Record<string, any>) {
    if (!payload) return payload;
    const safe = { ...payload };
    if (safe.password) safe.password = "******";
    if (safe.token) safe.token = "******";
    if (safe.accessToken) safe.accessToken = "******";
    if (safe.refreshToken) safe.refreshToken = "******";
    if (safe.email) safe.email = maskEmail(safe.email);
    return safe;
}

export const logger = {
    info: (message: string, payload?: Record<string, any>) => {
        const safe = sanitizePayload(payload);
        if (process.env.NODE_ENV !== "production") {
            console.info(`[INFO] ${message}`, safe);
        }
    },
    warn: (message: string, payload?: Record<string, any>) => {
        const safe = sanitizePayload(payload);
        if (process.env.NODE_ENV !== "production") {
            console.warn(`[WARN] ${message}`, safe);
        }
    },
    error: (message: string, payload?: any) => {
        const safe = sanitizePayload(payload);
        console.error(`[ERROR] ${message}`, safe);
    },
};
