
const API_URL= "http://scalable.services.com"
const auth = "authentication"
export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/${auth}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to authenticate");
    }

    return await response.json();
};

export const register = async (username, email, password, mnemonic) => {
    const response = await fetch(`${API_URL}/${auth}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
            mnemonic,
        }),
    });

    return response.json();
};

// utils/api.js
export const validateToken = async (token) => {
    try {
        const response = await fetch("http://scalable.services.com/authentication/api/v1/auth/verify", {
            method: "POST", // Use POST as per your example
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
            }),
        });

        // Check if the response is OK (status 200-299)
        if (response.ok) {
            return await response.json(); // Return the response from the server
        } else {
            return { success: false, message: "Return with Error" };
        }
    } catch (error) {
        console.error("Token validation failed:", error);
        return { success: false, message: error.message };
    }
};

