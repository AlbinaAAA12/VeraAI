import {describe,expect,it} from 'vitest';
import {validateGeneral,validateLabFile,validateLogin} from './validation';
import {emotionalQuestions,symptomsPart1,symptomsPart2} from './questionData';
describe('draft validation',()=>{
  it('validates login credentials format',()=>{expect(validateLogin('','x')).toContain('корректный');expect(validateLogin('anna@example.com','123')).toContain('6');expect(validateLogin('anna@example.com','veritas2026')).toBe('')});
  it('requires completed general data and validates ranges',()=>{const empty={age:'',height:'',weight:''};expect(validateGeneral(empty)).toBe('invalid');expect(validateGeneral({age:'32',height:'170',weight:'65',pregnancy:'Нет',breastfeeding:'Нет',chronic:'Нет',medications:'Нет',vitamins:'Нет',labDate:'1–3 месяца назад'})).toBe('')});
  it('handles draft upload validation states',()=>{expect(validateLabFile({name:'large.pdf',type:'application/pdf',size:11*1024*1024})).toBe('size');expect(validateLabFile({name:'test.txt',type:'text/plain',size:10})).toBe('type');expect(validateLabFile({name:'protected.pdf',type:'application/pdf',size:10})).toBe('protected');expect(validateLabFile({name:'partial.pdf',type:'application/pdf',size:10})).toBe('partial');});
  it('keeps the exact 9/9/9 draft question groups and removes the unsafe prompt',()=>{
    expect(symptomsPart1).toEqual(['Как часто вы ощущаете постоянную усталость?','Как часто возникает дневная сонливость?','Ощущаете ли вы общую слабость?','Возникают ли у вас головокружения?','Появляется ли одышка при обычной физической нагрузке?','Замечаете ли вы учащённое сердцебиение?','Наблюдаете ли вы выпадение волос?','Стали ли ногти более ломкими?','Беспокоит ли вас сухость кожи?']);
    expect(symptomsPart2).toEqual(['Ощущаете ли вы мышечную слабость?','Возникают ли мышечные судороги?','Бывает ли онемение или покалывание в конечностях?','Стало ли сложнее запоминать информацию?','Стало ли труднее концентрироваться?','Снизилась ли ваша работоспособность?','Изменился ли ваш аппетит?','Произошло ли заметное изменение массы тела?','Есть ли нарушения сна?']);
    expect(emotionalQuestions).toHaveLength(9);
    expect(new Set([...symptomsPart1,...symptomsPart2]).size).toBe(18);
    expect(emotionalQuestions.join(' ')).not.toMatch(/смерт|не хочется жить/i);
  });
  it('keeps only draft routes and uses the draft manual/delete states',async()=>{const source=await import('node:fs/promises').then(fs=>fs.readFile(`${process.cwd()}/src/main.tsx`,'utf8'));const removed=['regis'+'ter','confirm'+'-email','for'+'got','set-'+'password','password-'+'success','assessment'+'/'+'processing'];for(const word of removed)expect(source.toLowerCase()).not.toContain(word.toLowerCase());expect(source).toContain('/assessment/review');expect(source).toContain('Ввести вручную');expect(source).not.toContain('ManualEntry');expect(source).not.toContain('manual-editor');expect(source).toContain('Удалить результат?');expect(source).toContain('Согласия и ограничения');});
});
