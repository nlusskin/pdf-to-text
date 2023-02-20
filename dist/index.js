#! /usr/bin/env node
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
const commander_1 = require("commander");
const convert_1 = __importDefault(require("./cli/convert"));
commander_1.program
    .name('PDF -> Text')
    .description('Convert PDF documents to images or text')
    .version('0.0.1');
commander_1.program
    .option('-q', '--quiet', 'suppress verbose output');
const options = commander_1.program.opts();
if (options.quiet)
    null;
commander_1.program
    .command('convert')
    .description('Convert pdf to images or text file. By default, the program will output a single text file in the current directory.')
    .argument('<filename>', 'path to file')
    .option('-o, --imageonly', 'output image files instead of text')
    .option('-i, --both', 'output images in addition to text')
    .option('-p, --pages', 'do not concatenate text into a single file')
    .option('-d, --outdir <path>', 'output directory')
    .option('-s, --startpage <number>', 'start page of pdf')
    .option('-e, --endpage <number>', 'end page of pdf')
    .action((filename, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, convert_1.default)(filename, options);
    }
    catch (e) {
        console.error(e.message);
    }
}));
commander_1.program.parse(process.argv);
