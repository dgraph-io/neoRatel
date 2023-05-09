import * as monaco from 'monaco-editor';

// Custom language configuration for GraphQL
const graphqlConf = {
  comments: {
    lineComment: '#',
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: "'", close: "'", notIn: ['string', 'comment'] },
    { open: '"', close: '"', notIn: ['string'] },
  ],
};

monaco.languages.register({ id: 'graphql' });
monaco.languages.setLanguageConfiguration('graphql', graphqlConf);

// Import JSON language
import 'monaco-editor/esm/vs/language/json/monaco.contribution';
