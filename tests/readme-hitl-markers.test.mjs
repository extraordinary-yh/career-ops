// Local-fork policy: translated READMEs preserve application authority and report structure.
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { pass, fail, ROOT } from './helpers.mjs';

console.log('README application authority and report structure');
const marker = '<!-- application-authority -->';
const readmes = readdirSync(ROOT).filter((f) => /^README[\w.-]*\.md$/.test(f)).sort();
if (readmes.length >= 17) pass(`found ${readmes.length} README files`);
else fail('expected the full translated README family');

for (const file of readmes) {
  const content = readFileSync(join(ROOT, file), 'utf8');
  const rows = content.split('\n').filter((line) => line.includes(marker));
  if (rows.length === 1 && rows[0].startsWith('|') &&
      rows[0].includes('authorized applications') && rows[0].includes('verify the receipt')) {
    pass(`${file}: application authority remains in its table row`);
  } else {
    fail(`${file}: missing application-authority table row`);
  }
  if (content.includes('A-H') || content.includes('A–H')) pass(`${file}: A-H report structure`);
  else fail(`${file}: missing A-H report structure`);
}
