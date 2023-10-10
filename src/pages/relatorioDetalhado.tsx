import Cabersalho from '@/components/basicos/cabersalho';
import Menu from '@/components/composto/menu'
import RelatorioDetalhadoForm from '@/components/basicos/relatorioDetalhadoForm'; 

export default function relatorioDetalhado() {
    return (
        <div className={`flex min-h-screen flex-col items-center bg-white`}>
            <Cabersalho />
            <Menu />
            <RelatorioDetalhadoForm />
        </div>
    );
}