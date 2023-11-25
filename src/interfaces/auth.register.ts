import { UserBasicData } from "./user.interface";

export interface SignUpRequestBody {
    first_name              :string;
    last_name               :string;
    email                   :string;
    password                :string;
}

export interface SingUpRequestResponse {
    message                 :string;
    refresh                 :string;
    token                   :string;
    user                    :UserBasicData;
}

export interface SignInRequestBody {
    email                   :string;
    password                :string;
}

export interface SignInRequestOption {
    method                  :string;
    url                     :string;
    headers                 :any;
    data                    :SignInRequestBody;
}