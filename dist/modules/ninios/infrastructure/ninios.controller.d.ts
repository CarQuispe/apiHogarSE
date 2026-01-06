import { CreateNinioUseCase } from '../application/create-ninio.use-case';
import { UpdateNinioUseCase } from '../application/update-ninio.use-case';
import { DeleteNinioUseCase } from '../application/delete-ninio.use-case';
import { GetNinioByIdUseCase } from '../application/get-ninio-by-id.use-case';
import { SearchNiniosUseCase } from '../application/search-ninios.use-case';
export declare class NiniosController {
    private readonly createUC;
    private readonly updateUC;
    private readonly deleteUC;
    private readonly getByIdUC;
    private readonly searchUC;
    constructor(createUC: CreateNinioUseCase, updateUC: UpdateNinioUseCase, deleteUC: DeleteNinioUseCase, getByIdUC: GetNinioByIdUseCase, searchUC: SearchNiniosUseCase);
    create(dto: any): Promise<import("../domain/ninio.entity").Ninio>;
    search(query: any): Promise<import("../domain/ninio.entity").Ninio[]>;
    get(id: number): Promise<import("../domain/ninio.entity").Ninio>;
    update(id: number, dto: any): Promise<import("../domain/ninio.entity").Ninio>;
    remove(id: number): Promise<void>;
}
