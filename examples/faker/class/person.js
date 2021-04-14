export class Person {
  constructor ({ id, name, age, gender, jobTitle }) {
    Object.assign(this, { id, name, age, gender, jobTitle })
  }

  getName () {
    return this.name
  }

  getAge() {
    return this.age
  }

  getGender () {
    return this.age
  }
}