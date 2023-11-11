
interface SignUpRequestBody {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}


interface signInRequestBody {
    email: string;
    password: string;
}

interface signInRequestOption {
    method: string;
    url: string;
    headers: any;
    data: signInRequestBody;
}
