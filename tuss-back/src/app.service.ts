import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPlaces(): Promise<
    { field: string; date: string; places: number; website: string }[]
  > {
    const result = [];
    const fieldsDatas = [
      {
        id: 'max2joules',
        website: 'https://max2joules.com',
        query: (date) =>
          `https://max2joules.com/module/iqitsearch/searchiqit?s=${date.replaceAll(
            ' ',
            '+',
          )}`,
      },
      {
        id: 'powerguncqb',
        website: 'https://www.powergun-terrain.fr/',
        query: (date) =>
          `https://www.powergun-terrain.fr/index.php/produit/cqb-${date.replaceAll(
            ' ',
            '-',
          )}/`,
      },
      {
        id: 'powergun-forêt',
        website: 'https://www.powergun-terrain.fr/',
        query: (date) =>
          `https://www.powergun-terrain.fr/index.php/produit/bois-${date.replaceAll(
            ' ',
            '-',
          )}/`,
      },
      {
        id: 'tat',
        website: 'https://tat-airsoft.jimdosite.com/',
        query: (date) =>
          `https://www.billetweb.fr/${new Date(date)
            .toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            })
            .split('/')
            .map((item, index, array) =>
              index === array.length - 1 ? item.slice(2) : item,
            )
            .join('-')}-partie-chez-la-tat`,
      },
    ];

    const text = await fetch('https://places-airsoft.github.io/').then((q) => {
      return q.text();
    });
    const extract = (tag, from) => {
      return from.split(`<${tag}>`)[1].split(`</${tag}>`)[0];
    };
    const formatDate = (date) => {
      let toDate = new Date(date);

      if (!toDate.getTime()) {
        const months = {
          fevrier: 'february',
          aout: 'august',
          decembre: 'december',
        };

        toDate = new Date(
          date.replace(
            /([a-zA-Zéû]+)/g,
            (match) => months[match.toLowerCase()] || match,
          ),
        );
      }

      return toDate;
    };
    const readableDate = (date) =>
      new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

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
        // [
        //   // Different handling
        //   'Mouse',
        //   'AlphaUnit',
        //   'Continental',
        //   'Caen Airsoft Team',
        //   'Domain (pas OP)',
        //   'Agency (pas OP)',

        //   // Other
        //   'Auderghem',
        //   'AMA France Dominicales',
        // ].includes(field)
        // Reverse handling - only handle those below
        !['Max2Joules', 'PowergunCQB', 'Powergun Forêt', 'TAT'].includes(field)
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

        result.push({
          id,
          field,
          fulldate: formatDate(date).getTime(),
          date: readableDate(formatDate(date)),
          places,
          link: fieldsDatas.find((f) => f.id === id)?.query(date),
        });
      });
    });

    const sorted = result.sort((a, b) => (a.fulldate > b.fulldate ? 1 : -1));

    // eslint-disable-next-line no-console
    console.table(sorted);
    return sorted;
  }
}
