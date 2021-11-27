class Interaction:

    @classmethod
    def run(cls, **parameters):
        return cls().execute(**parameters)

    def execute(self, **parameters):
        raise Exception(f'Interaction {self.__class__.__name__} not implemented')

