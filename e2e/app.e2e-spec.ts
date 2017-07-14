import { NgTourneymanPage } from './app.po';

describe('ng-tourneyman App', () => {
  let page: NgTourneymanPage;

  beforeEach(() => {
    page = new NgTourneymanPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
