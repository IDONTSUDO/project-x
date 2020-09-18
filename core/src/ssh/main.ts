import { NodeSSH, SSHError } from 'node-ssh'
import { PromisedTimeout } from '../lib/promised-timeout'

const ssh = new NodeSSH()

declare type ConfigSSH = {
  host: String,
  username: String,
  password: String,
  port: String
}
/**@problem  Общая работа с SSH.
 * @class SSH_include 
 * @method ssh_get() получение SSH соеденения.
 */
export class SSH_include {
  constructor(public host: string, public port: string | undefined, public username: string, public password: string, public timeout: number) { }
  public async ssh_get(): Promise<any> {
    if (!this.host) {
      return new Error('SSH "host" cannot be undefined')
    }
    if (!this.username) {
      return new Error('SSH "username" cannot be undefined')
    }
    if (!this.password) {
      return new Error('SSH "password" cannot be undefined')
    }
    let ssh_data_include: ConfigSSH = {
      port: this.port ?? "22",
      host: this.host,
      username: this.username,
      password: this.password
    }
    return PromisedTimeout(ssh.connect(ssh_data_include), this.timeout)
  }
} 