const localStorageMockOAuth= {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
global.localStorageOAuth = localStorageMockOAuth