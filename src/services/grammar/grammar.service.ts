import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGrammar } from 'src/interfaces/grammar';
import { Grammar, GrammarDocument } from 'src/schemas/grammar';

@Injectable()
export class GrammarService {}
