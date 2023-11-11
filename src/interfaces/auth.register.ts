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