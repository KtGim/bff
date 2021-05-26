import IndexService from './indexService';
import SecondService from './secondService';

type InstanceType = 'indexService' | 'secondService';

class Tenant {
  private indexService: IndexService;
  private secondService: SecondService;

  constructor() {
    this.indexService = new IndexService();
    this.secondService = new SecondService();
  }

  getService(name: InstanceType) {
    return this[name];
  }
}

export default Tenant;