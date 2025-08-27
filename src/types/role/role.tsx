export type UserRole = {
    id: string
    no: number
    nama: string
    email: string
    role: Role
}

export enum Role {
    Mahasiswa = "Mahasiswa",
    Dosen = "Dosen",
    Management = "Management"
}