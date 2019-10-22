import statuts, { dossierWorkflow, emptyWorkflow } from 'utils/statutsDossier';
test('compute workflow statuts', () => {
  const depose = statuts.find(s => s.id === 'DEPOSE');
  let dossier0 = {
    statutActuel: depose,
    historiqueStatuts: statuts.filter(s => s.id === 'DEPOSE')
  };
  console.log('dossier0=', JSON.stringify(dossier0));
  const incomplet = statuts.find(s => s.id === 'INCOMPLET');
  const h1 = emptyWorkflow().filter(s => s.ordre < 3);
  h1.push(incomplet);
  let dossier1 = {
    statutActuel: incomplet,
    historiqueStatuts: [...h1]
  };
  console.log('dossier1=', JSON.stringify(dossier1));
  const dossier0Workflow = dossierWorkflow(dossier0);
  console.log('dossierWorkflow(dossier0)=', JSON.stringify(dossier0Workflow));
  expect(dossier0Workflow.length).toBe(emptyWorkflow().length);
  const dossier1Workflow = dossierWorkflow(dossier1);
  console.log('dossierWorkflow(dossier1)=', JSON.stringify(dossier1Workflow));
  expect(dossier1Workflow.length).toBe(emptyWorkflow().length + 2);
  expect(dossier1Workflow.indexOf(incomplet)).toBe(3);
});
