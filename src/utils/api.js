
const url= "http://scalable.services.com"
const auth = "authentication"
export const login = async (username, password) => {
    const response = await fetch(`${url}/${auth}/api/v1/auth/login`, {
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

    const data = await response.json();
    return data;
};
