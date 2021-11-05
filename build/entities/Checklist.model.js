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
exports.Field = exports.Category = exports.Checklist = void 0;
const typeorm_1 = require("typeorm");
let Checklist = class Checklist {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Checklist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Checklist.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Checklist.prototype, "passed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Checklist.prototype, "creatorId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Checklist.prototype, "passerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Checklist.prototype, "managerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Checklist.prototype, "mark", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Checklist.prototype, "maxMark", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Checklist.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Checklist.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Category, (category) => category.checklist),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Checklist.prototype, "categories", void 0);
Checklist = __decorate([
    (0, typeorm_1.Entity)()
], Checklist);
exports.Checklist = Checklist;
let Category = class Category {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Category.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Checklist, (checklist) => checklist.categories, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Checklist)
], Category.prototype, "checklist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Field, (field) => field.category),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Category.prototype, "fields", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
exports.Category = Category;
let Field = class Field {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Field.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Field.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Field.prototype, "checked", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category, (category) => category.fields, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Category)
], Field.prototype, "category", void 0);
Field = __decorate([
    (0, typeorm_1.Entity)()
], Field);
exports.Field = Field;
