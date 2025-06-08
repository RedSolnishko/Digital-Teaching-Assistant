from sqlalchemy.inspection import inspect



class Serializable:
    """
    Mixin to add a `to_dict` method for SQLAlchemy models.
    - Serializes all column attributes by default.
    - Optional `include_relationships` to recursively include related objects.
    """

    def to_dict(self, include_relationships: bool = False) -> dict:
        data = {}
        for attr in inspect(self).mapper.column_attrs:
            data[attr.key] = getattr(self, attr.key)
        if include_relationships:
            for name, relation in inspect(self).mapper.relationships.items():
                value = getattr(self, name)
                if value is None:
                    data[name] = None
                elif relation.uselist:
                    data[name] = [item.to_dict(include_relationships=False) for item in value]
                else:
                    data[name] = value.to_dict(include_relationships=False)
        return data