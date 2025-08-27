import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";

const ROLE = [
    { value: "Management", label: "Management" },
    { value: "Mahasiswa", label: "Mahasiswa" },
    { value: "Pemonev", label: "Pemonev" },
    { value: "Dosen", label: "Dosen" },
];

export const FormContent = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <Input
                id="nama"
                label="Nama"
                type="text"
                validation={{ required: "Nama wajib diisi!" }}
            />
            <Input
                id="nip"
                label="NIP/NRP"
                type="number"
                validation={{ required: "NIP/NRP wajib diisi!" }}
            />
            <Input
                id="email"
                label="Email"
                type="email"
                validation={{ required: "Email wajib diisi!" }}
            />
            <SelectInput
                id="role"
                label="Role"
                options={ROLE}
                placeholder="Pilih role"
                isSearchable={false}
                validation={{ required: "Role wajib diisi!" }}
            />
        </div>
    );
};
