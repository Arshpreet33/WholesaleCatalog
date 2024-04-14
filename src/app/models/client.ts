export interface IClient {
  id: string
  code: string
  name: string
  email: string
  phoneNumber: string
  address: string
  address2: string
  city: string
  province: string
  postalCode: string
  isActive: boolean
}

export class Client implements IClient {
  id: string
  code: string
  name: string
  email: string
  phoneNumber: string
  address: string
  address2: string
  city: string
  province: string
  postalCode: string
  isActive: boolean

  constructor(init: ClientFormValues) {
    Object.assign(this, init)
    this.isActive = true
  }
}

export class ClientFormValues {
  id?: string = undefined
  code: string = ''
  name: string = ''
  email: string = ''
  phoneNumber: string = ''
  address: string = ''
  address2: string = ''
  city: string = ''
  province: string = ''
  postalCode: string = ''

  constructor(client?: ClientFormValues) {
    if (client) {
      this.id = client.id
      this.code = client.code
      this.name = client.name
      this.email = client.email
      this.phoneNumber = client.phoneNumber
      this.address = client.address
      this.address2 = client.address2 ?? ''
      this.city = client.city
      this.province = client.province
      this.postalCode = client.postalCode
    }
  }
}
