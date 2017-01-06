import { SummernoteNG2Page } from './app.po';

describe('summernote-ng2 App', function() {
  let page: SummernoteNG2Page;

  beforeEach(() => {
    page = new SummernoteNG2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
