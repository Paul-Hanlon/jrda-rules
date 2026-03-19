import { ReadingAge } from '../models/reading-age';
import { GlossaryTerm } from '../models/glossary';
import { GLOSSARY_TERMS_7_8 } from './glossary.data.7-8';
import { GLOSSARY_TERMS_9_10 } from './glossary.data.9-10';
import { GLOSSARY_TERMS_11_12 } from './glossary.data.11-12';
import { GLOSSARY_TERMS_13_PLUS } from './glossary.data.13+';

export const GLOSSARY_DATA_BY_AGE: Record<ReadingAge, GlossaryTerm[]> = {
  '7-8': GLOSSARY_TERMS_7_8,
  '9-10': GLOSSARY_TERMS_9_10,
  '11-12': GLOSSARY_TERMS_11_12,
  '13+': GLOSSARY_TERMS_13_PLUS,
};
