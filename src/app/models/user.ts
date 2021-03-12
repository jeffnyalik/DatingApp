export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public token: string,
        public user = {
            name: "", //pass to the user interface
            email: "", // pass to the user interface
        }

    ){}
}