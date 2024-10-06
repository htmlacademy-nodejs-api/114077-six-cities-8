import chalk from 'chalk';

import { Command } from './command.interface.js';

const logTitle = chalk.bold.blue;
const logCode = chalk.green;
const logCommet = chalk.italic.gray;

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${logTitle('Программа для подготовки данных для REST API сервера')}.

        Пример:
            ${logCode(' cli.js --<command> [--arguments] ')}

        Команды:
            --version:                   ${logCommet('# выводит номер версии')}
            --help:                      ${logCommet('# печатает этот текст')}
            --import <path>:             ${logCommet('# импортирует данные из TSV')}
            --generate <n> <path> <url>  ${logCommet('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
