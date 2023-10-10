import Cabersalho from '@/components/basicos/cabersalho';
import Menu from '@/components/composto/menu'

export default function relatorioUnitario() {
    return (
        <div className={`flex min-h-screen flex-col items-center bg-white`}>
            <Cabersalho />
            <Menu />
            
        </div>
    );
}