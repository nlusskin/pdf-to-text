"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const promises_1 = require("node:fs/promises");
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const node_util_1 = __importDefault(require("node:util"));
const exec = node_util_1.default.promisify(child_process_1.exec);
function default_1(filename, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let [img_dir, txt_dir] = yield createDirectories(options.outdir, options.imageonly ? 1 : 2);
        let dataBuffer = yield (0, promises_1.readFile)(filename);
        let pdfData = yield (0, pdf_parse_1.default)(dataBuffer);
        for (var i = 0; i < pdfData.numpages; i++) {
            let { stderr } = yield exec(`
      convert -density 150 -trim -background white -alpha remove \
      "${filename}[${i}]" -quality 100 -flatten -sharpen 0x1.0 \
      "${img_dir}/${i}.png"
    `);
            if (stderr)
                console.error(stderr);
        }
    });
}
exports.default = default_1;
function createDirectories(prefix, iter) {
    return __awaiter(this, void 0, void 0, function* () {
        let paths = [];
        prefix = node_path_1.default.join(prefix ? prefix : node_os_1.default.tmpdir(), 'ptt.');
        for (var i = 0; i < iter; i++) {
            paths.push(yield (0, promises_1.mkdtemp)(prefix));
        }
        return paths;
    });
}
