import Cabersalho from '@/components/basicos/cabersalho';
import FormCadastro from '@/components/basicos/formCadastro';
import Menu from '@/components/composto/menu'

export default function cadastro() {
    return (
        <div className={`flex min-h-screen flex-col items-center bg-white`}>
            <Cabersalho />
            <Menu />
            <FormCadastro />
        </div>
    );
}
