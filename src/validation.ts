export function validateLogin(email:string,password:string){
  if(!/^\S+@\S+\.\S+$/.test(email)) return 'Введите корректный адрес электронной почты';
  if(password.length<6) return 'Пароль должен содержать не менее 6 символов';
  return '';
}
export function validateGeneral(data:{age:string;height:string;weight:string;pregnancy?:string;breastfeeding?:string;chronic?:string;medications?:string;vitamins?:string;labDate?:string}){
  if(!/^[1-9][0-9]?$/.test(data.age)||+data.age<14||+data.age>100||!/^\d{2,3}(\.\d)?$/.test(data.height)||!/^\d{2,3}(\.\d)?$/.test(data.weight)) return 'invalid';
  if(!data.pregnancy||!data.breastfeeding||!data.chronic||!data.medications||!data.vitamins||!data.labDate) return 'required';
  return '';
}
export function validateLabFile(file:{name:string;type:string;size:number}){
  if(file.size>10*1024*1024) return 'size';
  if(!['application/pdf','image/jpeg','image/png'].includes(file.type)&&!/[.]((pdf)|(jpe?g)|(png))$/i.test(file.name)) return 'type';
  const n=file.name.toLowerCase();
  if(n.includes('protected')) return 'protected';
  if(n.includes('unrecognized')) return 'unrecognized';
  return n.includes('partial')?'partial':'ok';
}
