import { Generics1Page } from './app.po';

describe('generics1 App', () => {
  let page: Generics1Page;

  beforeEach(() => {
    page = new Generics1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
