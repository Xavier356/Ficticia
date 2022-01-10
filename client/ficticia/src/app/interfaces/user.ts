export interface User {
    //id es opcional porque es un campo que no tengo que enviar
    id?: number;
    full_name: string;
    identification: number;
    age: number;
    gender: string;
    state: string;
    add_attrs: {};
}
