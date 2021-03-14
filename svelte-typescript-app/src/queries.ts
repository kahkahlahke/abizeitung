 export const getMe = async () => {
    const rawResponse = await fetch("/api/me-query", {credentials: "include"});
    const data = await rawResponse.json()
    return data;
}

function sortHelp(a: any, b: any){
    if(a._id < b._id){
        return -1;
    }
    if (a._id > b._id){
        return 1;
    }
    return 0;
}

export const getAllStudents = async () => {
    const rawResponse = await fetch("/api/get-students");
    const data = await rawResponse.json()
    return data.sort(sortHelp);
}

export const genericPost = async (url: string, body: object) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          credentials: "include"
    }
    await fetch(url, options)
}

export const genericGet = async (url: string) => {
    const res = await fetch(url, {credentials: "include"});
    const data = res.json();
    return data;
}