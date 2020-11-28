export interface CreateUserDto {
    name: string;
    surname: string;
    email: string;
    googleId?: string;
    photoUrl?: string;
}