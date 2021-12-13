"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoField = exports.InfoCategory = exports.InfoSlide = exports.InfoMenu = void 0;
const typeorm_1 = require("typeorm");
let InfoMenu = class InfoMenu {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InfoMenu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoMenu.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InfoSlide, (infoSlide) => infoSlide.infoMenu),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], InfoMenu.prototype, "slides", void 0);
InfoMenu = __decorate([
    (0, typeorm_1.Entity)()
], InfoMenu);
exports.InfoMenu = InfoMenu;
let InfoSlide = class InfoSlide {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InfoSlide.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoSlide.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InfoMenu, (infoMenu) => infoMenu.slides),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", InfoMenu)
], InfoSlide.prototype, "infoMenu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InfoCategory, (infoCategory) => infoCategory.infoSlide),
    __metadata("design:type", Array)
], InfoSlide.prototype, "infoCategories", void 0);
InfoSlide = __decorate([
    (0, typeorm_1.Entity)()
], InfoSlide);
exports.InfoSlide = InfoSlide;
let InfoCategory = class InfoCategory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InfoCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoCategory.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InfoCategory.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InfoSlide, (infoSlide) => infoSlide.infoCategories),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", InfoMenu)
], InfoCategory.prototype, "infoSlide", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InfoField, (infoField) => infoField.infoCategory),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], InfoCategory.prototype, "infoFields", void 0);
InfoCategory = __decorate([
    (0, typeorm_1.Entity)()
], InfoCategory);
exports.InfoCategory = InfoCategory;
let InfoField = class InfoField {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InfoField.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoField.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InfoField.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InfoField.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InfoCategory, (infoCategory) => infoCategory.infoFields),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", InfoCategory)
], InfoField.prototype, "infoCategory", void 0);
InfoField = __decorate([
    (0, typeorm_1.Entity)()
], InfoField);
exports.InfoField = InfoField;
