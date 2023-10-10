import Cabersalho from '@/components/basicos/cabersalho';
import Menu from '@/components/composto/menu'
import RelatorioUnificadoForm from '@/components/basicos/relatorioUnificadoForm';

export default function relatorioUnitario() {
    return (
        <div className={`flex min-h-screen flex-col items-center bg-white`}>
            <Cabersalho />
            <Menu />
            <RelatorioUnificadoForm />
        </div>
    );
}