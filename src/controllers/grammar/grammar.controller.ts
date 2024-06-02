import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GrammarDto } from 'src/dto/grammar';
import { IGrammar } from 'src/interfaces/grammar';
import { GrammarService } from 'src/services/grammar/grammar.service';

@Controller('grammar')
export class GrammarController {
    constructor(private grammarService: GrammarService) {}

    @Get()
    getAllGrammar() {
        return this.grammarService.getAllGrammar();
    }

    @Get(':id')
    getOneGrammar(@Param('id') id): Promise<IGrammar> {
        return this.grammarService.getGrammarById(id);
    }

    @Post()
    sendGrammarExc(@Body() data: GrammarDto): Promise<IGrammar> {
        return this.grammarService.sendGrammar(data);
    }
}
