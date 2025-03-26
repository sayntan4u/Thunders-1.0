class Activity {
    constructor(name, list, networkingDone, networkingTarget, infosDone, infosTarget,reinfosDone, reinfosTarget, meetupsDone, 
        meetupsTarget, invisDone, invisTarget, plans, pendingPlans, remarks) {
            (this.name = name),
      (this.list = list),
        (this.networkingDone = networkingDone),
        (this.networkingTarget = networkingTarget),
        (this.infosDone = infosDone),
        (this.infosTarget = infosTarget),
        (this.reinfosDone = reinfosDone),
        (this.reinfosTarget = reinfosTarget),
        (this.meetupsDone = meetupsDone),
        (this.meetupsTarget = meetupsTarget),
        (this.invisDone = invisDone),
        (this.invisTarget = invisTarget),
        (this.plans = plans),
        (this.pendingPlans = pendingPlans),
        (this.remarks = remarks);
    }
  }
  
  export default Activity;