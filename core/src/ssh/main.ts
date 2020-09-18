const {NodeSSH} = require('node-ssh')

const ssh = new NodeSSH()


export class SSH_include {
  
    private host: string;
    private port: number;
    private name: string;
    private password: string;
    private privateKey:string
    
    constructor(host:string, port:number, name:string, password:string,privateKey:string) {
      this.host = host;
      this.port = port;
      this.name = name;
      this.password = password;
      this.privateKey = privateKey;
    }
    static ssh_check(){
        
    }
}