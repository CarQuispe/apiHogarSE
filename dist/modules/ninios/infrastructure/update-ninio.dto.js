"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNinioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ninio_dto_1 = require("./create-ninio.dto");
class UpdateNinioDto extends (0, mapped_types_1.PartialType)(create_ninio_dto_1.CreateNinioDto) {
}
exports.UpdateNinioDto = UpdateNinioDto;
//# sourceMappingURL=update-ninio.dto.js.map