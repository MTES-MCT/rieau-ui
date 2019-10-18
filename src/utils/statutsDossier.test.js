import statuts, { mergeStatuts } from 'utils/statutsDossier';
test('merge statuts', () => {
  let initStatuts = statuts.filter(s => s.id !== 'INCOMPLET');
  let dossier0 = {
    historiqueStatuts: statuts.filter(s => s.id === 'DEPOSE')
  };
  let dossier1 = {
    historiqueStatuts: initStatuts.push(
      statuts.filter(s => s.id === 'INCOMPLET')
    )
  };
  console.log('initStatuts=', JSON.stringify(initStatuts));
  console.log('dossier0=', JSON.stringify(dossier0));
  console.log(
    'mergeStatuts(dossier0)=',
    JSON.stringify(mergeStatuts(dossier0))
  );
  expect(mergeStatuts(dossier0).length).toBe(initStatuts.length);
  expect(mergeStatuts(dossier1).length).toBe(dossier1.historiqueStatuts.length);
});
