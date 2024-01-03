import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPlaces(): Promise<
    { field: string; date: string; places: number }[]
  > {
    const result = [];

    const text = await fetch('https://places-airsoft.github.io/').then((q) => {
      return q.text();
    });
    const extract = (tag, from) => {
      return from.split(`<${tag}>`)[1].split(`</${tag}>`)[0];
    };

    const body = extract('body', text).split('').join('');

    const groups = body
      .split('<p><strong>')[1]
      .split('</p>')
      .slice(1)
      .join('')
      .split('<hr />');

    groups.forEach((group) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [id, field, content] = group
        .split(/<h2 id="(.+)">(.*)<\/h2>/)
        .map((item) => item.trim())
        .filter(Boolean);

      if (!field || field === 'Notes') {
        return null;
      }
      if (content.includes('Rien trouvé')) {
        return null;
      }

      if (
        [
          'Mouse',
          'AlphaUnit',
          'Continental',
          'Caen Airsoft Team',
          'Domain (pas OP)',
          'Agency (pas OP)',
        ].includes(field)
      ) {
        // console.log('handle this b$tch -> ' + field)
        return null;
      }

      const games = extract('ul', content)
        .split('<li>')
        .map((item) => item.split('</li>')[0])
        .map((item) => item.trim())
        .filter(Boolean);

      games.forEach((game) => {
        const title = game
          .split('<p>')[1]
          .split(' <br />')[0]
          .split('<img')[0]
          .trim();

        const date = title.match(
          /(\d{2}\/\d{2}\/\d{2})|(\d{1,2} .+ \d{4})|(\d{1,2} .+?(?=\())|(\d{1,2} .+)/,
        )[0];

        const places = Number(
          game
            .split('%20')[1]
            .split('-green')[0]
            .split('-orange')[0]
            .split('-red')[0]
            .split('restantes-')[1],
        );

        // result.push({ field, date: new Date(date), places });
        result.push({ field, date, places });
      });
    });

    // eslint-disable-next-line no-console
    console.table(result);
    return result;
  }
}
