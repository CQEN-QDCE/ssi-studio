//const domino = require('domino');
//const winObj = domino.createWindow();
//global['window'] = winObj;
//global['document'] = winObj.document;

import { Injectable } from '@nestjs/common';
// @ts-ignore
//import * as odcaPkg from 'odca';

//const Kotlin = require('kotlin');

//var HashMap_init = Kotlin.kotlin.collections.HashMap_init_q3lmfv$;

//const odca = odcaPkg.com.thehumancolossuslab.odca;

//const facade = new odca.Facade();

@Injectable()
export class OcaService {
  getOca(): string {
    return 'Bonjour!dfdfdfdf';
  }

  createSchema(book: any): any {
    //let result = this.createSchemaFromForm(book.baseForm, book.form);
    //return result;
  }
/*
  private createSchemaFromForm(baseForm: any, form: any): any {
    const baseInfo = HashMap_init()
    const attributes = []

    baseInfo.put_xwzc9p$("name", baseForm.name)
    baseInfo.put_xwzc9p$("description", baseForm.description)
    baseInfo.put_xwzc9p$("classification", baseForm.classification)

    const attrNames = form.sections.map(s => s.row.controls.map(c => c.attrName)).flat(1)
    const duplicates = attrNames.filter((attrName, index) => {
        return attrNames.indexOf(attrName) != index;
    })
    if (duplicates.length > 0) {
        duplicates.forEach(attrName => {
            throw `Attribute name '${attrName}' is duplicated`
        })
    }
    console.log('form.sections: ' + JSON.stringify(form.sections));
    console.log('-------------------------');
    console.log('form.translations: ' + JSON.stringify(form.translations));
    form.sections.forEach(section => {
      let category = section.label;
      let categories = [category]

      section.row.controls.forEach(control => {
          if (control.attrName.length <= 0) {
            throw "Attribute name cannot be empty"
          }

          const format = (control.dateFormat &&
            control.dateFormat.length > 0) ?
            this.dateFormaterToStandard(control.dateFormat) : null
            const translations = HashMap_init();
            for (const translation of form.translations) {
              const language = translation.language;
              const values = HashMap_init();
              
              if (values) {
                for (const controlTranslation of translation.data.controls) {
                  if (controlTranslation.fieldName === control.fieldName) {
                    if (controlTranslation.label) values.put_xwzc9p$('label', controlTranslation.label);
                    if (controlTranslation.label) values.put_xwzc9p$('categories', categories); // Régler ceci.
                    if (controlTranslation.information) values.put_xwzc9p$('information', controlTranslation.information);
                    if (controlTranslation.dataOptions && controlTranslation.dataOptions.length > 0) values.put_xwzc9p$('entry', controlTranslation.dataOptions.map(o => o.text));
                  }
                }
                translations.put_xwzc9p$(language, values);
              }
            }
          attributes.push(
            new odca.AttributeDto(
              control.attrName,
              control.attrType,
              control.isPII,
              translations,
              format,
              control.encoding
            )
          )
      })
    })
//    console.log('baseInfo: ' + JSON.stringify(baseInfo));
//    console.log('attributes: ' + JSON.stringify(attributes));

  return JSON.parse(
    facade.serialize(
      facade.renderSchema(baseInfo, attributes)
    )
  )
  }

  private dateFormaterToStandard(JQueryFormat) {
    return JQueryFormat.toUpperCase().split('Y').join('YY')
  }
  */
}
