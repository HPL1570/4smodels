import * as yup from 'yup';
class MasterDataComponent {
  constructor(
    MasterDataId,
    Name,
    DataType,
    Source,
    SynonymsList,
    TableName,
    FieldName,
    SearchNames,
    ApiName,
    ApiDataJson
  ) {
    this.MasterDataId = MasterDataId;
    this.Name = Name;
    this.DataType = DataType;
    this.Source = Source;
    this.SynonymsList = SynonymsList;
    this.TableName = TableName;
    this.FieldName = FieldName;
    this.SearchNames = SearchNames;
    this.ApiName = ApiName;
    this.ApiDataJson = ApiDataJson;
  }

  static validateData(data) {
    try {
      MasterDataComponent.MasterDataComponentSchema.validateSync(data);
    } catch (error) {
      throw new Error(`Validation Error: ${error.message}`);
    }
  }

  static createFromData(data) {
    return new MasterDataComponent(
      data.MasterDataId,
      data.Name,
      data.DataType,
      data.Source,
      data.SynonymsList,
      data.TableName,
      data.FieldName,
      data.SearchNames,
      data.ApiName,
      data.ApiDataJson
    );
  }

  update(data) {
    if (!data) return; // No data provided for update

    // Validate the incoming data against the schema
    MasterDataComponent.validateData(data);

    // Update each property based on the provided data
    this.Name = data.Name || this.Name;
    this.DataType = data.DataType || this.DataType;
    this.Source = data.Source || this.Source;
    this.SynonymsList = data.SynonymsList || this.SynonymsList;
    this.TableName = data.TableName || this.TableName;
    this.FieldName = data.FieldName || this.FieldName;
    this.SearchNames = data.SearchNames || this.SearchNames;
    this.ApiName = data.ApiName || this.ApiName;
    this.ApiDataJson = {
      ...this.ApiDataJson,
      ...data.ApiDataJson,
      ExtraInputParameters: [
        ...(this.ApiDataJson.ExtraInputParameters || []),
        ...(data.ApiDataJson.ExtraInputParameters || []),
      ],
      OutputList: [
        ...(this.ApiDataJson.OutputList || []),
        ...(data.ApiDataJson.OutputList || []),
      ],
    };
  }
}

MasterDataComponent.MasterDataComponentSchema = yup.object().shape({
  MasterDataId: yup.number(),
  Name: yup.string(),
  DataType: yup.string(),
  Source: yup.string(),
  SynonymsList: yup.string().nullable(),
  TableName: yup.string().nullable(),
  FieldName: yup.string().nullable(),
  SearchNames: yup.object().nullable(),
  ApiName: yup.string().nullable(),
  ApiDataJson: yup.object().shape({
    IdColumnName: yup.string(),
    IdColumnType: yup.string(),
    IdSearchString: yup.string().nullable(),
    IdOutputLabel: yup.string().nullable(),
    ValueColumnName: yup.string(),
    ValueColumnDataType: yup.string(),
    ValueSearchString: yup.string().nullable(),
    ValueOutputLabel: yup.string().nullable(),
    ExtraInputParameters: yup.array().of(
      yup.object().shape({
        ColumnName: yup.string(),
        Mandatory: yup.boolean().default(false),
        SearchString: yup.string().nullable(),
        OutputLabel: yup.string().nullable(),
      })
    ),
    OutputList: yup.array().of(
      yup.object().shape({
        ColumnName: yup.string(),
        DataType: yup.string(),
        ColumnLabel: yup.string().nullable(),
      })
    ),
  }),
});

export default MasterDataComponent;
